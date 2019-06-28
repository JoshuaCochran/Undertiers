from django.db import models
from django.core.validators import int_list_validator, MinValueValidator, MaxValueValidator
from django.conf import settings
from django.core.exceptions import ValidationError

# Create your models here.
class Unit(models.Model):
    name = models.CharField(max_length=200) # Unit name
    icon_url = models.URLField() # Stores the URL to the img for unit icons
    tile_url = models.URLField() # Stores the URL to the img for the unit representation on map

    def __str__(self):
        return self.name

class Map(models.Model):
    name = models.CharField(max_length=200) # User-set map name
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    ) # ID of user who saved the map
    description = models.TextField(default="") # Map description given by user
    pieces = models.ManyToManyField(Unit, through='UnitLoc') # Join table representing the M:N relationship
                                                             # between maps and units

    def __str__(self):
        return self.name

# Represents the M:N relationship between units and maps
# Stores the unit_id of a unit that is saved on a given map_id as well as unit position on the map
class UnitLoc(models.Model):
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE) # Unit ID of the unit on map
    map = models.ForeignKey(Map, on_delete=models.CASCADE) # Map ID of map
    #Position Coordinate of unit on the map. Validates unit is between 0 and 31 because the map has an area of 32 tiles
    pos = models.IntegerField(validators=[MinValueValidator(0, "Value must be non-negative"),
                                          MaxValueValidator(31, "Value must be below 32")])

class Alliance(models.Model):
    name = models.CharField(max_length=200) # Alliance name
    min_units = models.IntegerField() # Minimum number of units required to activate one rank of alliance
    max_units = models.IntegerField() # Maximum number of units that can contribute to alliance
                                      # Used to calculate number of tiers of alliance (max_units/min_units)
    icon_url = models.URLField() # URL to the img for alliance icon
    description = models.CharField(max_length=200, default="") # Description of Alliance bonus
    units = models.ManyToManyField(Unit) # Intermediary join table representing M:N relationship
                                         # between alliances and units
