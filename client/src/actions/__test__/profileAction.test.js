import posts from '../../api';

describe('Profile Action test', () => {
  var id = ["7b870527-4bbb-425c-bb7b-5dcd18298a32"];
  describe('Profile action', () => {
	it('should fetch values from backend', async () => {

    const a = await posts.post('/api/item/deleteItemsTest', {id: id});
    console.log(a.data);
    expect(a.data).toEqual('success');
	});
  });
});
