
import { useState } from "react";

export default function useEmojiPicker(comment, formData, setFormData) {

    const [showEmoji, setShowEmoji] = useState(false);

    const addEmoji = (e) => {
        try {
            const sym = e.unified.split("_");
            const codeArray = [];

            for (const el of sym) {
                const codePoint = parseInt(el, 16); // Convert hex to integer
                if (!isNaN(codePoint) && isFinite(codePoint)) {
                    codeArray.push(codePoint);
                }
            }

            if (codeArray.length > 0) {
                let emoji = String.fromCodePoint(...codeArray);
                setFormData({
                    ...formData,
                    comment: comment + emoji,
                });
            } else {
                // Handle the case where the code points are not valid
                console.error("Invalid Unicode code points");
            }
        } catch (error) {
            // Handle any unexpected errors that may occur
            console.error("An error occurred:", error);
        }
    };



    return {
        showEmoji, setShowEmoji, addEmoji
    };
}
