import json
import sys
import time
import urllib.request
import urllib.parse
import os

BASE = sys.argv[1].rstrip("/")

POSITIVE = (
    "cinematic shot, a majestic red fox running swiftly through a snowy winter forest, "
    "snowflakes falling, golden hour light rays through the trees, camera tracking smoothly, "
    "highly detailed, photorealistic"
)
NEGATIVE = (
    "\u8272\u8c03\u8273\u4e3d\uff0c\u8fc7\u66dd\uff0c\u9759\u6001\uff0c\u7ec6\u8282\u6a21\u7cca\u4e0d\u6e05\uff0c\u5b57\u5e55\uff0c"
    "\u98ce\u683c\uff0c\u4f5c\u54c1\uff0c\u753b\u4f5c\uff0c\u753b\u9762\uff0c\u9759\u6b62\uff0c\u6574\u4f53\u53d1\u7070\uff0c"
    "\u6700\u5dee\u8d28\u91cf\uff0c\u4f4e\u8d28\u91cf\uff0cJPEG\u538b\u7f29\u6b8b\u7559\uff0c\u4e11\u964b\u7684\uff0c\u6b8b\u7f3a\u7684\uff0c"
    "\u591a\u4f59\u7684\u624b\u6307\uff0c\u753b\u5f97\u4e0d\u597d\u7684\u624b\u90e8\uff0c\u753b\u5f97\u4e0d\u597d\u7684\u8138\u90e8\uff0c"
    "\u7578\u5f62\u7684\uff0c\u6bc1\u5bb9\u7684\uff0c\u5f62\u6001\u7578\u5f62\u7684\u80a2\u4f53\uff0c\u624b\u6307\u878d\u5408\uff0c"
    "\u9759\u6b62\u4e0d\u52a8\u7684\u753b\u9762\uff0c\u6742\u4e71\u7684\u80cc\u666f\uff0c\u4e09\u6761\u817f\uff0c\u80cc\u666f\u4eba\u5f88\u591a\uff0c\u5012\u7740\u8d70"
)

NODES = {
    "38": {"class_type": "CLIPLoader", "inputs": {"clip_name": "umt5_xxl_fp8_e4m3fn_scaled.safetensors", "type": "wan", "device": "default"}},
    "39": {"class_type": "VAELoader", "inputs": {"vae_name": "wan_2.1_vae.safetensors"}},
    "37": {"class_type": "UNETLoader", "inputs": {"unet_name": "wan2.1_t2v_1.3B_fp16.safetensors", "weight_dtype": "default"}},
    "40": {"class_type": "EmptyHunyuanLatentVideo", "inputs": {"width": 832, "height": 480, "length": 65, "batch_size": 1}},
    "6": {"class_type": "CLIPTextEncode", "inputs": {"text": POSITIVE, "clip": ["38", 0]}},
    "7": {"class_type": "CLIPTextEncode", "inputs": {"text": NEGATIVE, "clip": ["38", 0]}},
    "48": {"class_type": "ModelSamplingSD3", "inputs": {"shift": 8, "model": ["37", 0]}},
    "3": {"class_type": "KSampler", "inputs": {"seed": int(time.time() * 1000) % (2**31), "steps": 30, "cfg": 6.0, "sampler_name": "uni_pc", "scheduler": "simple", "denoise": 1.0, "model": ["48", 0], "positive": ["6", 0], "negative": ["7", 0], "latent_image": ["40", 0]}},
    "8": {"class_type": "VAEDecode", "inputs": {"samples": ["3", 0], "vae": ["39", 0]}},
    "49": {"class_type": "CreateVideo", "inputs": {"fps": 16, "images": ["8", 0]}},
    "50": {"class_type": "SaveVideo", "inputs": {"filename_prefix": "video/ComfyUI", "format": "auto", "codec": "auto", "width": "auto", "height": "auto", "video": ["49", 0]}},
}


def req(url, data=None, timeout=120):
    import urllib.error
    if data is not None:
        body = json.dumps(data).encode()
        r = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    else:
        r = urllib.request.Request(url)
    try:
        with urllib.request.urlopen(r, timeout=timeout) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        err = e.read().decode(errors="replace")
        print("HTTP ERROR", e.code, ":", err[:2000])
        raise


def main():
    stats = req(f"{BASE}/system_stats", timeout=30)
    print("SERVER OK -", stats.get("system", {}).get("comfyui_version"))

    payload = {"prompt": NODES, "client_id": "opencode"}
    res = req(f"{BASE}/prompt", payload)
    pid = res["prompt_id"]
    print("SUBMITTED prompt_id:", pid)

    while True:
        time.sleep(30)
        try:
            hist = req(f"{BASE}/history/{pid}")
        except Exception as e:
            print("history poll error:", e)
            continue
        if pid in hist:
            h = hist[pid]
            status = h.get("status", {})
            if status.get("status_str") == "success":
                outputs = h.get("outputs", {})
                for nid, out in outputs.items():
                    for f in out.get("gifs", []) + out.get("videos", []):
                        fname = f["filename"]
                        print("DONE:", fname, f.get("subfolder", ""))
                        url = f"{BASE}/view?filename={urllib.parse.quote(fname)}&subfolder={urllib.parse.quote(f.get('subfolder', ''))}&type=output"
                        with urllib.request.urlopen(url, timeout=300) as resp:
                            data = resp.read()
                        local = os.path.join(r"C:\Users\WINDOWS\Documents\Default Project", fname.replace("/", "_"))
                        with open(local, "wb") as fh:
                            fh.write(data)
                        print("SAVED:", local, f"{len(data)/1e6:.1f} MB")
                return
            elif status.get("status_str") == "error":
                print("ERROR in execution:", status)
                return
        else:
            print("still running...", time.strftime("%H:%M:%S"))


if __name__ == "__main__":
    main()