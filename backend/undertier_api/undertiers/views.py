from rest_framework import generics, response, status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from knox.views import LoginView as KnoxLoginView

from .models import Unit, UnitLoc, Map, Alliance, Upvote
from .serializers import UnitSerializer, UnitLocSerializer, MapSerializer, AllianceSerializer, UpvoteSerializer, BoardSerializer

class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]

class UpvoteView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = UpvoteSerializer

    def get_queryset(self, *args, **kwargs):
        return Upvote.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        upvote = Upvote(user=self.request.user)
        serializer = self.serializer_class(upvote, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpvotesView(generics.ListAPIView):
    permission_classes = [AllowAny,]
    serializer_class = UpvoteSerializer
    queryset = Upvote.objects.all()

class DownvoteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = UpvoteSerializer

    def get_object(self):
        return Upvote.objects.filter(user=self.request.user, board=self.request.data["board"])

class CreateBoard(generics.CreateAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = BoardSerializer
    queryset = Map.objects.all()

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
class DetailBoard(generics.ListAPIView):
    permission_classes = [AllowAny,]
    # Returns all UnitLoc objects (units on a given map with position on map) given the private key in the url
    def get_queryset(self, *args, **kwargs):
        return UnitLoc.objects.filter(board__id=self.kwargs.get('pk'))

    serializer_class = UnitLocSerializer

class UpdateBoard(generics.UpdateAPIView):
    queryset = Map.objects.all()
    permission_classes = [IsAuthenticated,]
    serializer_class = MapSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        if Map.objects.filter(id=request.data["pk"], user=self.request.user):
            return super(UpdateBoard, self).partial_update(request, *args, **kwargs)
        return null

class AddUnitToBoard(generics.ListCreateAPIView):
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

        if isinstance(data, list):
            kwargs["many"] = True

        return super(AddUnitToBoard, self).get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        if Map.objects.filter(id=request.data[0]["board"], user=self.request.user):
            UnitLoc.objects.filter(board__id=request.data[0]["board"]).delete()
            return super(AddUnitToBoard, self).create(request, *args, **kwargs)
        return null

    queryset = UnitLoc.objects.all()
    serializer_class = UnitLocSerializer

class DetailMap(generics.ListAPIView):
    permission_classes = [AllowAny,]
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
class ListUnits(generics.ListAPIView):
    permission_classes = [AllowAny,]
    queryset = Unit.objects.filter()
    serializer_class = UnitSerializer

# The view giving all the details of a single unit
class DetailUnit(generics.RetrieveUpdateDestroyAPIView):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer