from rest_framework import serializers
from .models import Unit, UnitLoc, Map, Alliance

class AllianceSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'min_units',
            'max_units',
            'icon_url',
            'description',
        )

        model = Alliance

class UnitSerializer(serializers.ModelSerializer):
    alliances = AllianceSerializer(source="alliance_set", many=True, read_only=True)

    class Meta:
        fields = (
            'id',
            'name',
            'icon_url',
            'tile_url',
            'alliances',
        )
        model = Unit

class MapSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'user',
            'description',
        )

        model = Map

class UnitLocSerializer(serializers.ModelSerializer):
    unit = UnitSerializer()
    map = MapSerializer()

    class Meta:
        fields = (
            'unit',
            'map',
            'pos',
        )

        model = UnitLoc