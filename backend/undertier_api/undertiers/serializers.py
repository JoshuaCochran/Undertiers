from rest_framework import serializers
from .models import Unit, UnitLoc, Map, Alliance

# Serializer for alliance model
class AllianceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'min_units',
            'max_units',
            'icon_url',
            'description',
            'synergy_1',
            'synergy_2',
            'synergy_3',
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

# Serializer for maps.
class MapSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'user',
            'description',
        )

        model = Map

# Serializer for unit locations. The UnitLoc model represents an intermediary JOIN table between units and maps.
class UnitLocSerializer(serializers.ModelSerializer):
    unit = UnitSerializer() # Serializes all related units
    map = MapSerializer() # Serializes all related maps

    class Meta:
        fields = (
            'unit',
            'map',
            'pos',
        )

        model = UnitLoc