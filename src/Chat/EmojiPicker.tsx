import React from 'react';
import { Picker } from 'emoji-mart';


const EmojiPicker = ({ addEmoji }) => (
    <Picker onSelect={addEmoji} />
);

export default EmojiPicker;
