// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator === "undefined") return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      textArea.remove();
      return successful;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

// Read from clipboard
export const readFromClipboard = async (): Promise<string | null> => {
  if (typeof navigator === "undefined") return null;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.readText();
    }
    return null;
  } catch (error) {
    console.error("Failed to read from clipboard:", error);
    return null;
  }
};

// Share via Web Share API
export const share = async (data: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<boolean> => {
  if (typeof navigator === "undefined" || !navigator.share) return false;

  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    if ((error as Error).name !== "AbortError") {
      console.error("Share failed:", error);
    }
    return false;
  }
};
