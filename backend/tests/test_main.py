from model.main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_get_data():
    response = client.get("/data")
    assert response.status_code == 200
    assert response.json() == {
        "datapoints": [
            {
                "x": 1, 
                "y": 2, 
                "comment_count": 0
            },
            {
                "x": 2, 
                "y": 3, 
                "comment_count": 3
            },
            {
                "x": 3, 
                "y": 4, 
                "comment_count": 0
            },
            {
                "x": 4, 
                "y": 6, 
                "comment_count": 0
            },
            {
                "x": 5, 
                "y": 8, 
                "comment_count": 1
            },
            {
                "x": 6, 
                "y": 5, 
                "comment_count": 0
            },
            {
                "x": 7, 
                "y": 3, 
                "comment_count": 1
            },
            {
                "x": 8, 
                "y": 6, 
                "comment_count": 0
            },
            {
                "x": 9, 
                "y": 7, 
                "comment_count": 0
            },
            {
                "x": 10,
                "y":  9,
                "comment_count": 0
            }
        ]
    }

def test_get_comments():
    response = client.get("/comments")
    assert response.status_code == 200
    assert response.json() == {
        "comments": [
            {
                "id": 1, 
                "username": "Dave", 
                "text":"Nice data!", 
                "datapoint": 2
            },
            {
                "id": 2, 
                "username": "Sally",
                "text": "Good job everyone", 
                "datapoint": 2
            },
            {
                "id": 3, 
                "username": "Dave", 
                "text":"This release was tough", 
                "datapoint": 2
            },
            {
                "id": 4, 
                "username": "Mike", 
                "text":"This isn't good", 
                "datapoint": 5
            },
            {
                "id": 5, 
                "username": "Steve",
                "text": "Looking better", 
                "datapoint": 7
            }
        ]
    }

def test_add_comment():
    response = client.post(
        "/comments/add/",
        json = {
            "id": 6, 
            "username": "Lucy", 
            "text": "New comment!", 
            "datapoint": 8
        }
    )
    assert response.status_code == 200
    assert response.json() == {
        "comment": {
            "id": 6, 
            "username": "Lucy", 
            "text": "New comment!", 
            "datapoint": 8
        }
    }

def test_add_comment_invalid():
    response = client.post(
        "/comments/add/",
        json={"username": "Lucy", "text": "New comment!", "datapoint": 8}
    )
    assert response.status_code == 422