# Privacy Policy — Quick QR Scanner

**Last updated:** April 21, 2026

## Overview

Quick QR Scanner is a Chrome extension that detects and decodes QR codes visible on your current browser tab.

## Data We Do NOT Collect

- We do **not** collect, store, transmit, or share any personal data.
- We do **not** send screenshots, images, or decoded QR content to any server.
- We do **not** use analytics, tracking scripts, or telemetry of any kind.
- We do **not** read your browsing history or access any tabs other than the one you actively trigger a scan on.

## How It Works

When you click **"Scan Active Tab"**:

1. Chrome's built-in `captureVisibleTab` API temporarily captures a screenshot of the visible area of your **current tab only**.
2. The screenshot is processed **entirely in your browser** (in the extension popup) using the open-source [jsQR](https://github.com/cozmo/jsQR) library.
3. The decoded result (if any) is displayed in the popup. Nothing leaves your device.

## Permissions Used

| Permission | Why It's Needed |
|---|---|
| `activeTab` | Required to capture a screenshot of the current tab when you click the extension |
| `host_permissions: <all_urls>` | Required by Chrome to allow `captureVisibleTab` to work on any tab |

## Changes to This Policy

If this policy is ever updated, the "Last updated" date above will be changed and the new version will be published.

## Contact

For any questions, please open an issue at the project repository.
