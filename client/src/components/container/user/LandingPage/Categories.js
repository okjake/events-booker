import React, { useRef } from 'react';

const categories = [
  'Upcoming',
  'Public',
  'Startups',
  'Freelance',
  'Code Academy',
];

const Categories = ({ setAllEvents, setFilteredEvents }) => {
  const buttons = useRef();

  const filterByCategory = (cat) => {
    if (cat === 'Upcoming') setAllEvents(cat);
    else setFilteredEvents(cat);
    if (buttons.current) {
      buttons.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="catagories" ref={buttons}>
      {categories.map((cat) => (
        <button
          type="button"
          key={cat}
          className="catagories__btn"
          onClick={() => filterByCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories;
