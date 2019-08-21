from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Unit, UnitLoc, Map, Alliance, Upvote

# Serializer for alliance model
class AllianceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'min_units',
            'max_units',
            'icon_url',
            'synergies',
        )

        model = Alliance

# Serializer for units. Takes account of M:N relationship between units and alliances.
class UnitSerializer(serializers.ModelSerializer):
    # Serializes all related alliances. Representing M:N relationship
    alliances = AllianceSerializer(source="alliance_set", many=True, read_only=True)

    class Meta:
        fields = (
            'id',
            'name',
            'icon_url',
            'tile_url',
            'tier',
            'alliances',
        )
        model = Unit

class UnitPieceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'icon_url',
        )
        model = Unit

# Serializer for maps.
class MapSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        fields = (
            'id',
            'name',
            'username',
            'description',
        )

        model = Map

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Map

# Serializer for unit locations. The UnitLoc model represents an intermediary JOIN table between units and maps.
class UnitLocSerializer(serializers.ModelSerializer):
    unit = UnitSerializer()
    class Meta:
        fields = '__all__'
        model = UnitLoc

class UpvoteSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user', 'board')
        model = Upvote
        validators = [
            UniqueTogetherValidator(
                queryset=Upvote.objects.all(),
                fields=['user', 'board']
            )
        ]

class DetailedBoardSerializer(serializers.ModelSerializer):
    pieces = UnitLocSerializer(source="unitloc_set", many=True)
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username

    class Meta:
        fields = ("id", "username", "name", "description", "pieces")
        model = Map
        depth = 1