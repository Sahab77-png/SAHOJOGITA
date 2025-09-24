import {checkModeration} from './moderationAPI';
import {uploadPostToFirebase} from '../utils/postHelper';
export const handlePostUpload = async (Content, user) => {
    const moderationResult = await checkModeration(Content);
    if (moderationResult?.flagged) {
        return {
            success: false,
            warning: "This post may contain hate, provocation, or misinformation"
        };
    }
    const result = await
    uploadPostToFirebase(Content, user);
    return { success: true, data: result};
};