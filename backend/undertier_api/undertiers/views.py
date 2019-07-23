from rest_framework import generics, response

from .models import Unit, UnitLoc, Map, Alliance
from .serializers import UnitSerializer, UnitLocSerializer, MapSerializer, AllianceSerializer

# The view giving a list of all units on all maps and their positions.
class ListMaps(generics.ListCreateAPIView):
    queryset = UnitLoc.objects.all()
    serializer_class = UnitLocSerializer

# The view giving a list of all units on a particular map and their positions.
class DetailMap(generics.ListCreateAPIView):
    # Returns all UnitLoc objects (units on a given map with position on map) given the private key in the url
    def get_queryset(self, *args, **kwargs):
        return UnitLoc.objects.filter(board__id=self.kwargs.get('pk'))
    serializer_class = UnitLocSerializer

# The view giving a list of all alliances
class ListAlliances(generics.ListCreateAPIView):
    queryset = Alliance.objects.all()
    serializer_class = AllianceSerializer

# The view giving all the details of a single alliance
class DetailAlliance(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alliance.objects.all()
    serializer_class = AllianceSerializer

# The view giving a list of all units
class ListUnits(generics.ListCreateAPIView):
    queryset = Unit.objects.filter()
    serializer_class = UnitSerializer

# The view giving all the details of a single unit
class DetailUnit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer