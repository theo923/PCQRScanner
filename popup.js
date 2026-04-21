document.addEventListener('DOMContentLoaded', () => {
  const scanBtn = document.getElementById('scan-btn');
  const resultDiv = document.getElementById('result');

  scanBtn.addEventListener('click', async () => {
    resultDiv.textContent = "Scanning...";
    resultDiv.classList.remove('error');

    try {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (!tabs || tabs.length === 0) {
          showError("Could not find active tab.");
          return;
        }

        let activeTab = tabs[0];
        
        // Capture the visible part of the active tab
        chrome.tabs.captureVisibleTab(activeTab.windowId, { format: "png" }, function(dataUrl) {
          if (chrome.runtime.lastError) {
            showError("Error: " + chrome.runtime.lastError.message);
            return;
          }

          if (!dataUrl) {
            showError("Failed to capture tab.");
            return;
          }
          
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            
            // Draw captured image to canvas
            ctx.drawImage(img, 0, 0);
            
            try {
              // Get image data
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              
              // Ensure jsQR is loaded
              if (typeof jsQR !== 'function') {
                showError("QR scanner library not loaded properly.");
                return;
              }

              // Scan for QR code
              const code = jsQR(imageData.data, canvas.width, canvas.height);
              
              if (code && code.data) {
                // If it's a URL, make it clickable
                if (code.data.startsWith('http://') || code.data.startsWith('https://')) {
                  resultDiv.innerHTML = `<a href="${code.data}" target="_blank" rel="noopener noreferrer">${code.data}</a>`;
                } else {
                  resultDiv.textContent = code.data;
                }
              } else {
                resultDiv.textContent = "No QR code found on the visible screen. Make sure the QR code is clearly visible and try again.";
              }
            } catch (err) {
              showError("Error processing image: " + err.message);
            }
          };
          
          img.onerror = () => {
            showError("Failed to load captured image for processing.");
          };
          
          img.src = dataUrl;
        });
      });
    } catch (e) {
      showError("Error: " + e.message);
    }
  });

  function showError(msg) {
    resultDiv.textContent = msg;
    resultDiv.classList.add('error');
  }
});
