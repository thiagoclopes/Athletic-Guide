import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";


export function CalendarCard(){
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
        <div className="py-4 px-2">
            <Card>
                <CardContent className="h-[full] max-h-[50vh] mx-auto p-8">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                    />
                </CardContent>
            </Card>
        </div>
    )

}