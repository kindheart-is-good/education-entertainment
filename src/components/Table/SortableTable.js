import { useState } from "react";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import Table from "./Table";

function SortableTable(props) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const { config, data } = props;

    const handleClick = (label) => {
        if (sortOrder === null) {
            setSortOrder("asc");
            setSortBy(label);
        } else if (sortOrder === "asc") {
            setSortOrder("desc");
            setSortBy(label);
        } else if (sortOrder === "desc") {
            setSortOrder(null);
            setSortBy(null);
        }
    };

    // I'm not going to modify props in any way. In React, we do not modify props ever for any reason.
    // I'm going to map over these column config objects.
    // And if find a column config object with a sortValue property - I'm going to return a new object
    // that has all the same properties as the existing column config object, but it's gonna have an additional property as well.
    // So, create new set of config objects.
    const updatedConfig = config.map((column) => {
        if (!column.sortValue) {
            return column;
        }

        return {
            ...column,
            header: () => (
                <th
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleClick(column.label)}
                >
                    <div className="flex items-center">
                        {getIcons(column.label, sortBy, sortOrder)}
                        {column.label}
                    </div>
                </th>
            ),
        };
    });

    // Only sort data if sortOrder && sortBy are not null.
    // Make a copy of the 'data' prop.
    // Find the correct sortValue function and use it for sorting.
    let sortedData = data;
    if (sortOrder && sortBy) {
        const { sortValue } = config.find((column) => column.label === sortBy);
        sortedData = [...data].sort((a, b) => {
            const valueA = sortValue(a);
            const valueB = sortValue(b);

            const reverseOrder = sortOrder === "asc" ? 1 : -1;

            if (typeof valueA === "string") {
                return valueA.localeCompare(valueB) * reverseOrder;
            } else {
                return (valueA - valueB) * reverseOrder;
            }
        });
    }

    return (
        <div>
            {sortOrder} - {sortBy}
            <Table {...props} data={sortedData} config={updatedConfig} />
        </div>
    );

    // {...props} right here, that has a config property,
    // but because I'm listing out the config prop later on inside <Table /> element,
    // the config property that is present inside of {...props} will be overwritten.
}

function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) {
        return (
            <div>
                <GoArrowUp className="text-xs" />
                <GoArrowDown className="text-xs" />
            </div>
        );
    }

    if (sortOrder === null) {
        return (
            <div>
                <GoArrowUp className="text-xs" />
                <GoArrowDown className="text-xs" />
            </div>
        );
    } else if (sortOrder === "asc") {
        return (
            <div>
                <GoArrowUp />
            </div>
        );
    } else if (sortOrder === "desc") {
        return (
            <div>
                <GoArrowDown />
            </div>
        );
    }
}

export default SortableTable;
