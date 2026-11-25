---
title: "Upscale a low-resolution image"
job: "Make a small image larger for a post or a print, on a plan that lists an upscaler, or on a free desktop app"
summary: "A blurry product photo does not get sharper by stretching it. Use a plan that names the upscaler, and do not pay the next tier when the cheaper card already lists it."
audience: ["designers", "small-business"]
category: "Design"
topPick:
  name: "Magnific Premium"
  url: "https://www.magnific.com/pricing"
  why: "On the annual view, Magnific's Premium card shows $14.50/month, billed annually, beside $20. The same card lists Magnific image and video upscalers and a commercial AI license. Plus, at $33.75/month billed annually beside $45, is the card that adds Topaz upscalers."
  pricing:
    summary: "Annual view. Premium $14.50/month, billed annually, beside $20. The card lists Magnific image and video upscalers and a commercial AI license. Plus $33.75/month, billed annually, beside $45. Pro $82.50/month, billed annually, beside $110."
    sourceUrl: "https://www.magnific.com/pricing"
    checked: 2026-11-23
  affiliateUrl: null
budgetPick:
  name: "Upscayl"
  url: "https://github.com/upscayl/upscayl"
  why: "The GitHub repository describes Upscayl as a free and open-source AI image upscaler for Linux, macOS and Windows. The project site also describes it as free and open source. No subscription price is printed on either page."
  pricing:
    summary: "Free and open source, for Linux, macOS and Windows. No subscription price is printed on the repository page."
    sourceUrl: "https://github.com/upscayl/upscayl"
    checked: 2026-11-23
  affiliateUrl: null
  handsOn: 2026-11-25
  handsOnSummary: "Upscayl 2.15.0, free and open source, the Linux build from GitHub releases, on 25 Nov 2026. 2.15.0 is dated 25 Dec 2024 and was still the latest GitHub release on the test day. No account and no payment. The test machine had no GPU. Upscayl needs Vulkan. Without a Vulkan driver it stopped with \"Invalid GPU Device\". With Mesa's CPU Vulkan driver installed it ran on 8 CPU cores, so the times are CPU-only. A PC with a real GPU should be faster. Onboarding was 4 screens. \"Help improve Upscayl\" telemetry was on by default and was turned off. Auto-update was on by default. No account, donation or paid prompt was seen. A 320×240 product photo of a sourdough loaf, downscaled from a real 1280×960 photo, was upscaled 4× to 1280×960 as a PNG. The model dropdown showed two models: Upscayl Standard (the default) and Upscayl Lite. Standard took about 76 seconds. Lite took about 6 seconds. No errors. Both looked cleaner and sharper than a plain stretch (crisp flour spiral, scoring edge and cooling rack, no halos). Neither restored the real crumb and cracked-flour texture. Those areas came out smooth and painterly, and Lite was slightly smoother. Measured against the real 1280px photo, neither was closer than a plain bicubic stretch (PSNR about 21.4 dB for all three). The gain is perceived sharpness, not recovered detail. Fine for a web or shop thumbnail. Check textures before print. One image, 4× only, two models, and no GPU timing. Batch mode, Double Upscayl and other formats were not tested."
avoid:
  name: "Magnific Plus, when Premium already lists the upscaler"
  reason: "Premium, at $14.50/month billed annually, already lists Magnific image and video upscalers and a commercial AI license. Plus is $33.75/month billed annually and is the card that adds Topaz upscalers. Plus is the wrong spend for one Magnific upscale."
  sourceUrl: "https://www.magnific.com/pricing"
stack:
  - step: "The file"
    tool: "The small image you already have"
    role: "The original, not a screenshot of a screenshot."
  - step: "The upscale"
    tool: "Magnific Premium, or Upscayl"
    role: "Run the upscaler. On Magnific, stay on Premium unless you need the Topaz line that Plus lists."
  - step: "The look"
    tool: "The larger file next to the original"
    role: "Reject a result that invents text, a logo or a face that was not in the small file."
  - step: "The use"
    tool: "The export on the plan you chose"
    role: "Check the licence line on the Magnific card before the image goes on a product page. Upscayl's site does not print a subscription."
alsoConsidered: []
testStatus: "pending"
lastTested: null
lastVerified: 2026-11-23
testNotes: "Hands-on note, 25 Nov 2026: Upscayl 2.15.0 only, the free and open-source Linux build from GitHub releases. 2.15.0 is dated 25 Dec 2024 and was still the latest GitHub release on the test day. No account and no payment. The test machine had no GPU. Upscayl needs Vulkan. Without a Vulkan driver it stopped with \"Invalid GPU Device\". With Mesa's CPU Vulkan driver installed it ran on 8 CPU cores, so the times are CPU-only. A PC with a real GPU should be faster. Onboarding was 4 screens. \"Help improve Upscayl\" telemetry was on by default and was turned off. Auto-update was on by default. No account, donation or paid prompt was seen. A 320×240 product photo of a sourdough loaf, downscaled from a real 1280×960 photo, was upscaled 4× to 1280×960 as a PNG. The model dropdown showed two models: Upscayl Standard (the default) and Upscayl Lite. Upscayl Standard took about 76 seconds. Upscayl Lite took about 6 seconds. No errors. Both looked cleaner and sharper than a plain stretch (crisp flour spiral, scoring edge and cooling rack, no halos), but neither restored the real crumb and cracked-flour texture of the original photo. Those areas came out smooth and painterly (Lite slightly smoother). Measured against the real 1280px photo, neither was closer than a plain bicubic stretch (PSNR about 21.4 dB for all three), so the gain is perceived sharpness, not recovered detail. Fine for a web or shop thumbnail. Check textures before print. Magnific Premium was not part of this check. Not tested: batch mode, Double Upscayl, other formats, and a real GPU. One image, 4× only, two models, and no GPU timing. The standard task is still pending: upscale the same small product photo in each tool, then compare edges and any invented detail, and record the published price."
---

## Who this is for

Designers and small businesses who have a small product or logo file and need a larger one for a post, a listing or a simple print.

## How to choose

- **You want the upscaler named on a paid card, with a commercial licence line:** Magnific Premium, $14.50/month billed annually, beside $20, on [Magnific's pricing page](https://www.magnific.com/pricing).
- **You can run a desktop app and you are not paying:** [Upscayl](https://github.com/upscayl/upscayl), described there as free and open source for Linux, macOS and Windows. The project site says the same: [upscayl.org](https://upscayl.org/). On 25 Nov 2026, Upscayl 2.15.0 on Linux, with no GPU, upscaled one 320×240 photo 4×. Magnific Premium was not part of that check.
- **The job is a cutout, not a larger file:** [Cut out a product photo](../../use-cases/cut-out-a-product-photo/).
- **The job is a logo from scratch:** [Design a logo and graphics](../../use-cases/design-logos-and-graphics/).

The note below is a local check of Upscayl 2.15.0 on Linux only, dated 25 Nov 2026. No account and no payment. Magnific Premium was not part of it. Prices were read on 23 Nov 2026. The standard task on this page has not been run.

The $20, $45 and $110 figures are the other numbers on those cards. This page does not relabel them as a monthly price the card did not name.

## Hands-on test (25 Nov 2026)

This note is for Upscayl, the budget pick. The version was Upscayl 2.15.0, free and open source, the Linux build from GitHub releases. 2.15.0 is dated 25 Dec 2024 and was still the latest GitHub release on the test day. The check ran on 25 Nov 2026. No account was used and nothing was paid. Magnific Premium, the top pick, was not part of it.

The test machine had no GPU. Upscayl needs Vulkan. Without a Vulkan driver it stopped with "Invalid GPU Device". With Mesa's CPU Vulkan driver installed it ran on 8 CPU cores, so the times below are CPU-only. A PC with a real GPU should be faster.

Onboarding was 4 screens. "Help improve Upscayl" telemetry was on by default, and it was turned off. Auto-update was on by default. No account, donation or paid prompt was seen.

The task was a 320×240 product photo of a sourdough loaf. It had been downscaled from a real 1280×960 photo, so the result could be compared with the original. It was upscaled 4× to 1280×960, as a PNG.

The model dropdown showed two models: Upscayl Standard, the default, and Upscayl Lite.

Upscayl Standard took about 76 seconds. Upscayl Lite took about 6 seconds. There were no errors.

Both looked cleaner and sharper than a plain stretch. The flour spiral, the scoring edge and the cooling rack were crisp, and there were no halos. Neither restored the real crumb and cracked-flour texture of the original photo. Those areas came out smooth and painterly. Lite was slightly smoother.

Measured against the real 1280px photo, neither was closer than a plain bicubic stretch. PSNR was about 21.4 dB for all three. The gain is perceived sharpness, not recovered detail. The result is fine for a web or shop thumbnail. Check textures before print.

Not tested: batch mode, Double Upscayl, other formats, and a real GPU. This was one image, at 4× only, with the two models in the dropdown, and the times are CPU-only.

The standard task on this page has not been run. That task is the same small product photo upscaled in each tool, then a comparison of edges and any invented detail, and the published price.

## Where this goes next

- The 25 Nov 2026 note is also listed on [Tested by us](../../tested/).
