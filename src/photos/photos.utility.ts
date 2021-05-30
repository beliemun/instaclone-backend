export const processHashtags = (caption: string) => {
  const hashtags =
    caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\u0E00-\u0E7F|\w]+/g) || [];
  return hashtags.map((hashtag: string) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
