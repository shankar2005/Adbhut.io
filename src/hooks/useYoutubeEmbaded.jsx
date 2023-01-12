// GET YouTube Embaded by Video URL
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

const useYoutubeEmbaded = (ytUrl) => {
    const videoId = getId(ytUrl);
    return <iframe className="w-full h-full" src={`//www.youtube.com/embed/${videoId}`} frameborder="0" allowfullscreen></iframe>
};

export default useYoutubeEmbaded;