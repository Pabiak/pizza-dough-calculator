const getFormattedDate = (date: Date | null, lang: string = "pl-PL") => {
  if (!date) return null;
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export default getFormattedDate;
