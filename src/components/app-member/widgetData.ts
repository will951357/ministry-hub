
import React from "react";
import { 
  Text, 
  Image, 
  MenuSquare, 
  Link, 
  Video, 
  Calendar, 
  List, 
  FileSpreadsheet, 
  BookOpen, 
  DollarSign, 
  Images, 
  Share2, 
  Podcast, 
  Map 
} from "lucide-react";
import { type WidgetType } from "./WidgetLibrary";

export const getAvailableWidgets = (): WidgetType[] => [
  { id: 'text', type: 'text', title: 'Text Box', icon: <Text className="h-5 w-5" /> },
  { id: 'image', type: 'image', title: 'Image', icon: <Image className="h-5 w-5" /> },
  { id: 'button', type: 'button', title: 'Button', icon: <MenuSquare className="h-5 w-5" /> },
  { id: 'link', type: 'link', title: 'Link', icon: <Link className="h-5 w-5" /> },
  { id: 'video', type: 'video', title: 'Video', icon: <Video className="h-5 w-5" /> },
  { id: 'calendar', type: 'calendar', title: 'Calendar', icon: <Calendar className="h-5 w-5" /> },
  { id: 'event-list', type: 'event-list', title: 'Event List', icon: <List className="h-5 w-5" /> },
  { id: 'contact-form', type: 'contact-form', title: 'Contact Form', icon: <FileSpreadsheet className="h-5 w-5" /> },
  { id: 'scripture', type: 'scripture', title: 'Scripture of the Day', icon: <BookOpen className="h-5 w-5" /> },
  { id: 'donation', type: 'donation', title: 'Donation Button', icon: <DollarSign className="h-5 w-5" /> },
  { id: 'carousel', type: 'carousel', title: 'Carousel', icon: <Images className="h-5 w-5" /> },
  { id: 'social-media', type: 'social-media', title: 'Social Media Links', icon: <Share2 className="h-5 w-5" /> },
  { id: 'podcast', type: 'podcast', title: 'Podcast/Audio', icon: <Podcast className="h-5 w-5" /> },
  { id: 'map', type: 'map', title: 'Map', icon: <Map className="h-5 w-5" /> },
];
