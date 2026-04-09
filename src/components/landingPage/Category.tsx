import CategoryWiseBooks from "./CategoryWiseBooks";
import BIO from "/images/biography.webp";
import CHILD from "/images/children.webp";
import LIRETURE from "/images/lireture.webp";

const Category = () => {
  return (
    <div>
        <CategoryWiseBooks categoryTitle="Biography & Memory" category="biography" IMG={BIO} />
        <CategoryWiseBooks categoryTitle="Children's Books" category="children" IMG={CHILD} />
        <CategoryWiseBooks categoryTitle="Literature & Fiction" category="literature" IMG={LIRETURE} />
    </div>
  )
}

export default Category