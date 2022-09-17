import sqlite3

class DataPoint():

    def __init__(self, x, y, comment_count):
        self.x = x
        self.y = y
        self.comment_count = comment_count

    def __eq__(self, other):
        return (
            self.x == other.x 
        and
            self.y == other.y 
        and
            self.comment_count == other.comment_count
        )

class Comment():
    pass

class DB():

    def __init__(self):
        self.conn = sqlite3.connect(":memory:")
        cur = self.conn.cursor()
        cur.execute("CREATE TABLE datapoint(x, y, commentCount)")
        cur.execute("CREATE TABLE comment(id, username, text, datapoint)")
        cur.execute("""
            INSERT INTO datapoint VALUES
                (1, 2, 0),
                (2, 3, 3),
                (3, 4, 0),
                (4, 6, 0),
                (5, 8, 1),
                (6, 5, 0),
                (7, 3, 1),
                (8, 6, 0),
                (9, 7, 0),
                (10, 9, 0)
        """)
        cur.execute("""
            INSERT INTO comment VALUES
                (1, "Dave", "Nice data!", 2),
                (2, "Sally", "Good job everyone", 2),
                (3, "Dave", "This release was tough", 2),
                (4, "Mike", "This isn't good", 5),
                (5, "Steve", "Looking better", 7)
        """)
        self.conn.commit()

    def get_data(self):
        res = self.conn.execute("SELECT * FROM datapoint")
        ret = []
        for item in res.fetchall():
            ret.append(DataPoint(item[0], item[1], item[2]))
        return ret