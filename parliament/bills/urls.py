from django.conf.urls.defaults import *

urlpatterns = patterns('parliament.bills.views',
    (r'^(?P<bill_id>\d+)/$', 'bill'),
    (r'^$', 'all_bills'),
)