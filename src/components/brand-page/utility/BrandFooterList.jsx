export function BrandFooterList({ heading, listArr }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">{heading}</h3>
      <ul>
        {listArr.map((text) => (
          <li>
            <a href="">{text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
