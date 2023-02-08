import unittest
import json
from app import app

# Test cases


class UserAPITestCase(unittest.TestCase):
    def setUp(self):
        app.config.from_object(self)
        self.client = app.test_client()

    def test_post_users(self):
        response = self.client.post('/users', content_type='application/json')
        self.assertEqual(response.status_code, 201)

        response = self.client.get('/users')
        self.assertEqual(response.status_code, 200)

        data = json.loads(response.data)
        self.assertGreater(len(data['items']), 0)

    def test_post_skill(self):
        data = {'name': 'Python'}
        response = self.client.post('/skill', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['skill']['name'], 'Python')

        response = self.client.get('/skill')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        print(data)
        self.assertGreater(len(data['items']), 0)

    def test_add_skill_to_user(self):
        skill = {'name': 'Java'}
        user = {'name': 'X-T'}
        # create user
        response = self.client.post('/user', data=json.dumps(user), content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # add skill
        response = self.client.post('/user/1/skill', data=json.dumps(skill), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertGreater(len(data['user']['skills']), 0)


if __name__ == '__main__':
    unittest.main()
