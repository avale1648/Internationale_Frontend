export function Media({ file }: { file: string }) {
    const extension = file.split('.').pop();

    if ( extension === 'apng' ||  extension === 'bmp' || extension === 'gif' || extension === 'jpeg' ||
        extension === 'jpg' || extension === 'png' || extension === 'webp' || extension === 'svg') {
        return (<img className='media-image' src={file} alt={file}></img>);
    }
    if(extension === 'mp4' || extension === 'ogg' || extension === 'webm') {
        return (<video className="media-video" src={file}></video>)
    }
    if(extension === 'mp3' || extension === 'wav') {
        return (<audio className="media-audio" src={file}></audio>)
    }
    else {
        throw new Error("Invalid file's format.");
    }
}