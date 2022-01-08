type RawRadio = {
  uid_rad: string;
  uid_ref: string;
  id_radet: string;
  sc_rad: string;
  nama: string;
  status: string;
  info: string;
  pendengar: string;
  judul: string;
  logo: string;
  url: string;
  kab: string;
  prop: string;
  neg: string;
  alias: string;
};

export type AudioInfo = {
  title: string;
  url: string;
  listener: number;
};

export type Radio = {
  id: string;
  name: string;
  status: string;
  city: string;
  regency: string;
  province: string;
  country: string;
  logo: string;
  audioInfo: AudioInfo;
};

const rawToRadio = (raw: RawRadio): Radio => {
  return {
    id: raw.uid_rad,
    name: raw.nama,
    status: raw.status,
    city: raw.info,
    regency: raw.kab,
    province: raw.prop,
    country: raw.neg,
    logo: raw.logo,
    audioInfo: {
      title: raw.judul,
      url: raw.url,
      listener: Number(raw.pendengar),
    },
  };
};

export async function getRadios({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const offset = (page - 1) * limit;

  const response = await fetch(
    `${process.env.RII_ENDPOINT}/radio/lrii.php?model=lima`
  );
  const rawRadios: RawRadio[] = await response.json();
  const radios = rawRadios.map(rawToRadio);

  // filter
  const sortedRadios = radios.sort((a, b) =>
    Number(a.audioInfo.listener) > Number(b.audioInfo.listener) ? -1 : 1
  );
  const limitedRadios = sortedRadios.slice(offset, page * limit);

  return { radios: limitedRadios, totalItem: radios.length };
}
