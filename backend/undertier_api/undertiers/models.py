from django.db import models
from django.core.validators import int_list_validator, MinValueValidator, MaxValueValidator
from django.conf import settings
from django.core.exceptions import ValidationError
from django_better_admin_arrayfield.models.fields import ArrayField

# The model describing a unit. TODO: Add tags for sorting.
class Unit(models.Model):
    name = models.CharField(max_length=200) # Unit name
    icon_url = models.URLField(default="http://localhost:8000/static/unit_icons/axe.png") # Stores the URL to the img for unit icons
    tile_url = models.URLField(default="http://localhost:8000/static/unit_icons/axe.png") # Stores the URL to the img for the unit representation on map
    # Stores the Tier (and hence gold cost) of the unit
    tier = models.IntegerField(validators=[MinValueValidator(1, "Value must be between 1 and 5"),
                                           MaxValueValidator(5, "Value must be between 1 and 5")])

    def __str__(self):
        return self.name

# The model describing the map. TODO: Add tags for sorting.
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
    board = models.ForeignKey(Map, on_delete=models.CASCADE) # Map ID of map
    #Position Coordinate of unit on the map. Validates unit is between 0 and 31 because the map has an area of 32 tiles
    posx = models.IntegerField(validators=[MinValueValidator(0, "Value must be non-negative"),
                                          MaxValueValidator(7, "Value must be below 32")], default=0)
    posy = models.IntegerField(validators=[MinValueValidator(0, "Value must be non-negative"),
                                          MaxValueValidator(3, "Value must be below 32")], default=0)

# The model describing an alliance.
class Alliance(models.Model):
    name = models.CharField(max_length=200) # Alliance name
    min_units = models.IntegerField() # Minimum number of units required to activate one rank of alliance
    max_units = models.IntegerField() # Maximum number of units that can contribute to alliance
                                      # Used to calculate number of tiers of alliance (max_units/min_units)
    icon_url = models.URLField(default="http://localhost:8000/static/alliance_icons/brawny.png") # URL to the img for alliance icon
    synergies = ArrayField(models.CharField(max_length=200, blank=True), null=True, default=list)
    units = models.ManyToManyField(Unit) # Intermediary join table representing M:N relationship
                                         # between alliances and units

class Upvote(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    map = models.ForeignKey(Map, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'map']