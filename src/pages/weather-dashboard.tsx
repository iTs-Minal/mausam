import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/use-geolocation";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react"


const WeatherDashboard = () => {

  const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();

  console.log(coordinates);

  const handleRefresh=()=>{
    getLocation();
    if(coordinates){
//yes yes
    }
  };

  if(locationLoading){
    return <WeatherSkeleton/>
  }

  if(locationError){
    return(
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit"> 
          <MapPin className="h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  if(!coordinates){
    return(
    <Alert variant="destructive">
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather.</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit"> 
          <MapPin className="h-4 w-4" />
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">my location</h1>
      <Button 
      variant={"outline"}
      size={"icon"}
      onClick={handleRefresh}
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
      </div>
    </div>
  )
}

export default WeatherDashboard
