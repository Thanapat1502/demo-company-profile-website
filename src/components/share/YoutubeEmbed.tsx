type Props = {
  url: string;
};

export default function YouTubeEmbed({ url }: Props) {
  const videoId = url.split("v=")[1]?.split("&")[0];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div className="aspect-video w-full max-w-4xl mx-auto">
      <iframe
        src={embedUrl}
        title="YouTube Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
