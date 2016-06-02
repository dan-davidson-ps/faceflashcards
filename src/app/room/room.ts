interface RoomBase {
  resourceName?: string;
  resourceType?: string;
  resourceDescription?: string;
  resourceEmail?: string;
}

export class Room implements RoomBase {
  id: string;
  name: string;
  resourceId: string;
}
