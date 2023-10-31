
import { useState } from "react";

export default function useEmojiPicker(comment, formData, setFormData, commentError) {

    const [showEmoji, setShowEmoji] = useState(false);

    const addEmoji = (emoji) => {
        try {
            if (emoji.native) {
                const updatedComment = comment + emoji.native;
                setFormData({
                    ...formData,
                    comment: updatedComment,
                });
            } else {
                // Handle the case where the emoji doesn't have a native representation
                console.error("Emoji does not have a native representation");
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
