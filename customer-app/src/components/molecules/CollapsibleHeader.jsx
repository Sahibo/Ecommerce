
export default function CollapsibleHeader () {
    const categories = ['Category 1', 'Category 2', 'Category 3'];
  
    return (
      <div className="collapsible-component">
        <ul>
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>
    );
  };