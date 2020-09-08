class SaveImageResponse:
    def __init__(self, rid, success, reason=''):
        self.rid = rid
        self.success = success
        self.reason = reason

    def as_dict(self):
        return {
            'id': self.rid,
            'success': self.success,
            'reason': self.reason
        }
