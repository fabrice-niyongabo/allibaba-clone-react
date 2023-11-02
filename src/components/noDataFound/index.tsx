function NoDataFound({ data, title }: { data: any[]; title?: string }) {
  return (
    <>
      {data.length === 0 && (
        <p className="m-0">{title ? title : "No data found."}</p>
      )}
    </>
  );
}

export default NoDataFound;
