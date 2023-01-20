// GET YouTube Embaded by Video URL
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

const useYoutubeEmbaded = (ytUrl, rounded) => {
    const videoId = getId(ytUrl);
    return <iframe className={`w-full h-full ${rounded}`} src={`//www.youtube-nocookie.com/embed/${videoId}`} frameBorder="0" allowFullScreen></iframe>
};

export default useYoutubeEmbaded;