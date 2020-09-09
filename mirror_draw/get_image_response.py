class GetImageResponse:
    def __init__(self, rid, success, data='', reason=''):
        self.rid = rid
        self.success = success
        self.data = data
        self.reason = reason

    def as_dict(self):
        return {
            'id': self.rid,
            'success': self.success,
            'data': self.data,
            'reason': self.reason
        }
