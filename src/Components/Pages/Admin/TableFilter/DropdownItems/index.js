import Dropdown from 'react-bootstrap/Dropdown';

const DropdownItems = (props) => {
    return props.categories.map((category) => {
        return (
            <Dropdown.Item key={category.id} href="#">
                {category.name}
            </Dropdown.Item>
        );
    });
};

export default DropdownItems;
