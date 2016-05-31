import {Room} from './room';
import {Site} from '../site';
export var SITES = <any>{
  'farmingtonWest': {
    "id": "farmingtonWest",
    "name": "Farmington West",
    "image": "farmington-west.svg",
    "rooms": <Room[]>[
      {
        "id": "azure",
        "name": "Azure",
        "gcal": "pluralsight.com_2d38323531373034392d343637@resource.calendar.google.com"
      },
      {
        "id": "boardroom",
        "name": "Board Room",
        "gcal": "pluralsight.com_31363038373632383038@resource.calendar.google.com"
      },
      {
        "id": "bootstrap",
        "name": "Bootstrap",
        "gcal": "pluralsight.com_2d3332343536303937323830@resource.calendar.google.com"
      },
      {"id": "cloud", "name": "Cloud"},
      {"id": "firewall", "name": "Firewall"},
      {"id": "fusion", "name": "Fusion"},
      {"id": "houdini", "name": "Houdini"},
      {"id": "modo", "name": "Modo"},
      {"id": "mudbox", "name": "Mudbox"},
      {"id": "nexus", "name": "Nexus"},
      {"id": "perl", "name": "Perl"},
      {"id": "powershell", "name": "Powershell"},
      {"id": "python", "name": "Python"},
      {"id": "rhino", "name": "Rhino"},
      {"id": "ruby", "name": "Ruby"},
      {"id": "scale", "name": "Scale"},
      {"id": "unity", "name": "Unity"},
      {"id": "wireshark", "name": "Wireshark"}
    ]
  }
  ,
  'farmingtonEast': {
    "id": "farmingtonEast",
    "name": "Farmington East",
    "image": "farmington-east.svg",
    "rooms": [
      {"id": "baldy", "name": "Baldy"},
      {"id": "ben_lomond", "name": "Ben Lomond"},
      {"id": "box_elder", "name": "Box Elder"},
      {"id": "big_horn", "name": "Big Horn"},
      {"id": "cathedral", "name": "Cathedral"},
      {"id": "devils_castle", "name": "Devils Castle"},
      {"id": "dromedary_peak", "name": "Dromedary Peak"},
      {"id": "francis_peak", "name": "Francis Peak"},
      {"id": "gobblers", "name": "Gobblers"},
      {"id": "grandeur_peak", "name": "Grandeur Peak"},
      {"id": "gunsight_peak", "name": "Gunsight Peak"},
      {"id": "hayden_peak", "name": "Hayden Peak"},
      {"id": "hidden_peak", "name": "Hidden Peak"},
      {"id": "honeycomb", "name": "Honeycomb"},
      {"id": "kessler_peak", "name": "Kessler Peak"},
      {"id": "kings_peak", "name": "Kings Peak"},
      {"id": "lone_peak", "name": "Lone Peak"},
      {"id": "lookout_peak", "name": "Lookout Peak"},
      {"id": "monte_cristo", "name": "Monte Cristo"},
      {"id": "mount_lovenia", "name": "Mount Lovenia"},
      {"id": "mount_ogden", "name": "Mount Ogden"},
      {"id": "olympus", "name": "Olympus"},
      {"id": "pfeifferhorn", "name": "Pfeifferhorn"},
      {"id": "south_thunder", "name": "South Thunder"},
      {"id": "summit_lounge", "name": "Summit Lounge"},
      {"id": "superior", "name": "Superior"},
      {"id": "timpanogos", "name": "Timpanogos"},
      {"id": "wolverine", "name": "Wolverine"}
    ]
  }
};

