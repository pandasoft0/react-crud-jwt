var data = [
    {
        "id": "45866079-3d29-4d02-a08f-209396acb5ef",
        "name": "Item 1"
    },
    {
        "id": "7b870527-4bbb-425c-bb7b-5dcd18298a32",
        "name": "Item 2"
    },
    {
        "id": "e1d76745-91c4-4a93-a9f1-962a6229cbf0",
        "name": "Item 3"
    },
    {
        "id": "ec0fb0eb-95d6-45a6-9d35-317ceaec9d59",
        "name": "Item 4"
    }
];

// var data = [
//     {
//         "id": "45866079-3d29-4d02-a08f-209396acb5ef",
//         "name": "Item 1"
//     },
//     {
//         "id": "7b870527-4bbb-425c-bb7b-5dcd18298a32",
//         "name": "Item 2"
//     },
//     {
//         "id": "e1d76745-91c4-4a93-a9f1-962a6229cbf0",
//         "name": "Item 3"
//     },
//     {
//         "id": "ec0fb0eb-95d6-45a6-9d35-317ceaec9d59",
//         "name": "Item 4"
//     }
// ];

const getData = () => data;
const addData = (item) => data.push(item)
const deleteData = (ids) => {
    data = data.filter(({id, name})=> !(id in ids))
}
const updateData = (item) => {
    data = data.map(({id, name})=> {
        if (id == item.id)
        {
          return {
            id, name: item.name
          };
        }
        else return {id, name};
      })
}
module.exports = { getData, addData, deleteData, updateData};