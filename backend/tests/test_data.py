from model.data import DB, DataPoint, Comment

def test_get_data():
    db = DB()
    data = db.get_data()
    assert data == [
        DataPoint(1, 2, 0),
        DataPoint(2, 3, 3),
        DataPoint(3, 4, 0),
        DataPoint(4, 6, 0),
        DataPoint(5, 8, 1),
        DataPoint(6, 5, 0),
        DataPoint(7, 3, 1),
        DataPoint(8, 6, 0),
        DataPoint(9, 7, 0),
        DataPoint(10, 9, 0)
    ]

def test_get_comments():
    db = DB()
    comments = db.get_comments()
    assert comments == [
        Comment(1, "Dave", "Nice data!", 2),
        Comment(2, "Sally", "Good job everyone", 2),
        Comment(3, "Dave", "This release was tough", 2),
        Comment(4, "Mike", "This isn't good", 5),
        Comment(5, "Steve", "Looking better", 7),
    ]

def test_add_comment():
    db = DB()
    new_comment = Comment(6, "Lucy", "New comment!", 8)
    db.add_comment(new_comment)
    comments = db.get_comments()
    assert len(comments) == 6
    assert comments[5] == new_comment

def test_initialise_db():
    db = DB()
    data = db.get_data()
    comments = db.get_comments()
    assert len(data) == 10
    assert len(comments) == 5