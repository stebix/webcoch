from django import forms 


POSITIONS: dict[str, str] = {
    'ENTPS'  : 'ENT physician',
    'ENTSG'  : 'ENT surgeon',
    'SPTP'   : 'speech therapist',
    'AUD'    : 'audiologist',
    'HATC'   : 'hearing aid technician',
    'OTHER'  : 'other'
}


class AudiogramPollSubmissionForm(forms.Form):
    first_name = forms.CharField(max_length=30)
    last_name = forms.CharField(max_length=30)
    email = forms.EmailField()
    institution = forms.CharField(max_length=75)
    position = forms.ChoiceField(choices=POSITIONS, required=True, initial=None)
    #points = forms.JSONField('user_set_raw_points')