import cloudinary from '@/configs/cloudinary.config'

export const uploadFile = async (
    file: File,
    folder: string,
): Promise<string> => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append(
            'upload_preset',
            import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
        )
        formData.append('folder', folder)
        formData.append(
            'api_key',
            import.meta.env.VITE_CLOUDINARY_API_KEY || '',
        )

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            },
        )

        if (!response.ok) {
            const errorData = await response.json()
            console.error('Cloudinary upload error:', errorData)
            throw new Error(
                errorData.error?.message ||
                    'Error uploading file to Cloudinary',
            )
        }

        const data = await response.json()
        return data.secure_url
    } catch (error) {
        console.error('Error uploading file:', error)
        throw error
    }
}
