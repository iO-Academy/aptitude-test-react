import Dropdown from 'react-bootstrap/Dropdown';

const DropdownItems = (props) => {
    const filterByCategory = (category) => {};
    return props.categories.map((category) => {
        return (
            <Dropdown.Item key={category.id} href="#" onClick={filterByCategory(category.name)}>
                {category.name}
            </Dropdown.Item>
        );
    });
};

export default DropdownItems;
