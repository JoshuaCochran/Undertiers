from rest_framework import generics, response, status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from knox.views import LoginView as KnoxLoginView

from .models import Unit, UnitLoc, Map, Alliance
from .serializers import UnitSerializer, UnitLocSerializer, MapSerializer, AllianceSerializer

class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]

# The view giving a list of all units on all maps and their positions.
class ListBoards(generics.ListAPIView):
    permission_classes = [AllowAny,]
    queryset = Map.objects.all()
    serializer_class = MapSerializer

class ListMyBoards(ModelViewSet):
    permission_classes = [IsAuthenticated,]
    serializer_class = MapSerializer

    def get_queryset(self):
        return Map.objects.filter(user=self.request.user).all()

# The view giving a list of all units on a particular map and their positions.
class DetailBoard(ModelViewSet):
    # Returns all UnitLoc objects (units on a given map with position on map) given the private key in the url
    def get_queryset(self, *args, **kwargs):
        return UnitLoc.objects.filter(board__id=self.kwargs.get('pk'))

    serializer_class = UnitLocSerializer

class AddUnitToBoard(generics.ListCreateAPIView):
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

        if isinstance(data, list):
            kwargs["many"] = True

        return super(AddUnitToBoard, self).get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        UnitLoc.objects.filter(board__id=request.data[0]["board"]).delete()
        return super(AddUnitToBoard, self).create(request, *args, **kwargs)

    queryset = UnitLoc.objects.all()
    serializer_class = UnitLocSerializer

class DetailMap(generics.ListCreateAPIView):
    def get_queryset(self, *args, **kwargs):
        return Map.objects.filter(id=self.kwargs.get('pk'))

    serializer_class = MapSerializer

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