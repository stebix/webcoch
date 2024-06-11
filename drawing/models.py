import uuid
from pathlib import Path

from django.db import models

# Create your models here.

def basepath() -> str:
    image_dir = Path('./static/adcanvas')
    # assert image_dir.is_dir(), f'basal canvas directory at \'{image_dir.resolve()}\' does not exist'
    return str(image_dir)

class AudiogramCanvas(models.Model):
    """
    Different audiogram canvas may exist with different axis scaling.
    poll results are only meaningful in the context of a given canvas image's
    scaling information.
    """
    filepath = models.FilePathField(path=basepath)
    scaling = models.JSONField()

    def __str__(self) -> str:
        return str(self.filepath)
    
    class Meta:
        db_table: str = 'audiogram_canvas_images'



POSITIONS: dict[str, str] = {
    'ENTPS'  : 'ENT physician',
    'ENTSG'  : 'ENT surgeon',
    'SPTP'   : 'speech therapist',
    'AUD'    : 'audiologist',
    'HATC'   : 'hearing aid technician',
    'OTHER'  : 'other'
}

class AudiogramPollSubmission(models.Model):
    """Submission model for a completed audiogram result form."""
    submit_ID = models.UUIDField(primary_key=True, default=uuid.uuid4)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    institution = models.CharField(max_length=75)
    position = models.CharField(verbose_name='user_position', max_length=10, choices=POSITIONS)
    submit_timestamp = models.DateTimeField(auto_now=True)
    points = models.JSONField('user_set_raw_points')
    # TODO: Add this later to connect the submission to a specifically selected background canvas
    # audiogram_canvas = models.ForeignKey(AudiogramCanvas, on_delete=models.RESTRICT, )

    def __str__(self) -> str:
        s = f'{self.__class__.__name__}(ID={self.submit_ID}, timestamp={self.submit_timestamp})'
        return s
    

    class Meta:
        db_table: str = 'audiogram_poll_submissions'


