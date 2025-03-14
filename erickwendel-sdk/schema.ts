// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    ID: string,
    String: string,
    Int: number,
    Float: number,
    Boolean: boolean,
}

export interface Query {
    getTalks: (TalkQuery | null)
    isAlive: (Scalars['Boolean'] | null)
    getPosts: (PostQuery | null)
    getVideos: (VideoQuery | null)
    getProjects: (ProjectQuery | null)
    __typename: 'Query'
}

export interface TalkQuery {
    totalCount: Scalars['Int']
    retrieved: Scalars['Int']
    processedIn: Scalars['Int']
    talks: ((Talk | null)[] | null)
    __typename: 'TalkQuery'
}

export interface Talk {
    _id: (Scalars['ID'] | null)
    title: (Scalars['String'] | null)
    abstract: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    event: (Event | null)
    slides: (Scalars['String'] | null)
    images: ((Image | null)[] | null)
    video: (Scalars['String'] | null)
    tags: ((Scalars['String'] | null)[] | null)
    location: (Location | null)
    additionalLinks: ((Scalars['String'] | null)[] | null)
    language: (Scalars['String'] | null)
    date: (Scalars['String'] | null)
    __typename: 'Talk'
}

export interface Event {
    link: (Scalars['String'] | null)
    name: (Scalars['String'] | null)
    __typename: 'Event'
}

export interface Image {
    url: (Scalars['String'] | null)
    filename: (Scalars['String'] | null)
    size: (Scalars['String'] | null)
    pathId: (Scalars['String'] | null)
    __typename: 'Image'
}

export interface Location {
    latitude: (Scalars['Float'] | null)
    longitude: (Scalars['Float'] | null)
    country: (Scalars['String'] | null)
    uf: (Scalars['String'] | null)
    city: (Scalars['String'] | null)
    __typename: 'Location'
}

export interface PostQuery {
    totalCount: Scalars['Int']
    retrieved: Scalars['Int']
    processedIn: Scalars['Int']
    posts: ((Post | null)[] | null)
    __typename: 'PostQuery'
}

export interface Post {
    _id: (Scalars['ID'] | null)
    title: (Scalars['String'] | null)
    abstract: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    link: (Scalars['String'] | null)
    additionalLinks: ((Scalars['String'] | null)[] | null)
    portal: (Portal | null)
    tags: ((Scalars['String'] | null)[] | null)
    language: (Scalars['String'] | null)
    date: (Scalars['String'] | null)
    __typename: 'Post'
}

export interface Portal {
    link: (Scalars['String'] | null)
    name: (Scalars['String'] | null)
    __typename: 'Portal'
}

export interface VideoQuery {
    totalCount: Scalars['Int']
    retrieved: Scalars['Int']
    processedIn: Scalars['Int']
    videos: ((Video | null)[] | null)
    __typename: 'VideoQuery'
}

export interface Video {
    _id: (Scalars['ID'] | null)
    title: (Scalars['String'] | null)
    abstract: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    link: (Scalars['String'] | null)
    additionalLinks: ((Scalars['String'] | null)[] | null)
    tags: ((Scalars['String'] | null)[] | null)
    language: (Scalars['String'] | null)
    date: (Scalars['String'] | null)
    __typename: 'Video'
}

export interface ProjectQuery {
    totalCount: Scalars['Int']
    retrieved: Scalars['Int']
    processedIn: Scalars['Int']
    projects: ((Project | null)[] | null)
    __typename: 'ProjectQuery'
}

export interface Project {
    _id: (Scalars['ID'] | null)
    title: (Scalars['String'] | null)
    abstract: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    link: (Scalars['String'] | null)
    additionalLinks: ((Scalars['String'] | null)[] | null)
    tags: ((Scalars['String'] | null)[] | null)
    language: (Scalars['String'] | null)
    date: (Scalars['String'] | null)
    __typename: 'Project'
}

export interface QueryGenqlSelection{
    getTalks?: (TalkQueryGenqlSelection & { __args?: {_id?: (Scalars['ID'] | null), title?: (Scalars['String'] | null), language?: (Scalars['String'] | null), city?: (Scalars['String'] | null), country?: (Scalars['String'] | null), skip?: (Scalars['Int'] | null), limit?: (Scalars['Int'] | null)} })
    isAlive?: boolean | number
    getPosts?: (PostQueryGenqlSelection & { __args?: {_id?: (Scalars['ID'] | null), title?: (Scalars['String'] | null), language?: (Scalars['String'] | null), portal?: (Scalars['String'] | null), skip?: (Scalars['Int'] | null), limit?: (Scalars['Int'] | null)} })
    getVideos?: (VideoQueryGenqlSelection & { __args?: {_id?: (Scalars['ID'] | null), title?: (Scalars['String'] | null), language?: (Scalars['String'] | null), skip?: (Scalars['Int'] | null), limit?: (Scalars['Int'] | null)} })
    getProjects?: (ProjectQueryGenqlSelection & { __args?: {_id?: (Scalars['ID'] | null), title?: (Scalars['String'] | null), language?: (Scalars['String'] | null), skip?: (Scalars['Int'] | null), limit?: (Scalars['Int'] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TalkQueryGenqlSelection{
    totalCount?: boolean | number
    retrieved?: boolean | number
    processedIn?: boolean | number
    talks?: TalkGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TalkGenqlSelection{
    _id?: boolean | number
    title?: boolean | number
    abstract?: boolean | number
    type?: boolean | number
    event?: EventGenqlSelection
    slides?: boolean | number
    images?: ImageGenqlSelection
    video?: boolean | number
    tags?: boolean | number
    location?: LocationGenqlSelection
    additionalLinks?: boolean | number
    language?: boolean | number
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EventGenqlSelection{
    link?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageGenqlSelection{
    url?: boolean | number
    filename?: boolean | number
    size?: boolean | number
    pathId?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface LocationGenqlSelection{
    latitude?: boolean | number
    longitude?: boolean | number
    country?: boolean | number
    uf?: boolean | number
    city?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostQueryGenqlSelection{
    totalCount?: boolean | number
    retrieved?: boolean | number
    processedIn?: boolean | number
    posts?: PostGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PostGenqlSelection{
    _id?: boolean | number
    title?: boolean | number
    abstract?: boolean | number
    type?: boolean | number
    link?: boolean | number
    additionalLinks?: boolean | number
    portal?: PortalGenqlSelection
    tags?: boolean | number
    language?: boolean | number
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PortalGenqlSelection{
    link?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VideoQueryGenqlSelection{
    totalCount?: boolean | number
    retrieved?: boolean | number
    processedIn?: boolean | number
    videos?: VideoGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface VideoGenqlSelection{
    _id?: boolean | number
    title?: boolean | number
    abstract?: boolean | number
    type?: boolean | number
    link?: boolean | number
    additionalLinks?: boolean | number
    tags?: boolean | number
    language?: boolean | number
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectQueryGenqlSelection{
    totalCount?: boolean | number
    retrieved?: boolean | number
    processedIn?: boolean | number
    projects?: ProjectGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ProjectGenqlSelection{
    _id?: boolean | number
    title?: boolean | number
    abstract?: boolean | number
    type?: boolean | number
    link?: boolean | number
    additionalLinks?: boolean | number
    tags?: boolean | number
    language?: boolean | number
    date?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const TalkQuery_possibleTypes: string[] = ['TalkQuery']
    export const isTalkQuery = (obj?: { __typename?: any } | null): obj is TalkQuery => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTalkQuery"')
      return TalkQuery_possibleTypes.includes(obj.__typename)
    }
    


    const Talk_possibleTypes: string[] = ['Talk']
    export const isTalk = (obj?: { __typename?: any } | null): obj is Talk => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTalk"')
      return Talk_possibleTypes.includes(obj.__typename)
    }
    


    const Event_possibleTypes: string[] = ['Event']
    export const isEvent = (obj?: { __typename?: any } | null): obj is Event => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isEvent"')
      return Event_possibleTypes.includes(obj.__typename)
    }
    


    const Image_possibleTypes: string[] = ['Image']
    export const isImage = (obj?: { __typename?: any } | null): obj is Image => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isImage"')
      return Image_possibleTypes.includes(obj.__typename)
    }
    


    const Location_possibleTypes: string[] = ['Location']
    export const isLocation = (obj?: { __typename?: any } | null): obj is Location => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isLocation"')
      return Location_possibleTypes.includes(obj.__typename)
    }
    


    const PostQuery_possibleTypes: string[] = ['PostQuery']
    export const isPostQuery = (obj?: { __typename?: any } | null): obj is PostQuery => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPostQuery"')
      return PostQuery_possibleTypes.includes(obj.__typename)
    }
    


    const Post_possibleTypes: string[] = ['Post']
    export const isPost = (obj?: { __typename?: any } | null): obj is Post => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPost"')
      return Post_possibleTypes.includes(obj.__typename)
    }
    


    const Portal_possibleTypes: string[] = ['Portal']
    export const isPortal = (obj?: { __typename?: any } | null): obj is Portal => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPortal"')
      return Portal_possibleTypes.includes(obj.__typename)
    }
    


    const VideoQuery_possibleTypes: string[] = ['VideoQuery']
    export const isVideoQuery = (obj?: { __typename?: any } | null): obj is VideoQuery => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVideoQuery"')
      return VideoQuery_possibleTypes.includes(obj.__typename)
    }
    


    const Video_possibleTypes: string[] = ['Video']
    export const isVideo = (obj?: { __typename?: any } | null): obj is Video => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isVideo"')
      return Video_possibleTypes.includes(obj.__typename)
    }
    


    const ProjectQuery_possibleTypes: string[] = ['ProjectQuery']
    export const isProjectQuery = (obj?: { __typename?: any } | null): obj is ProjectQuery => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProjectQuery"')
      return ProjectQuery_possibleTypes.includes(obj.__typename)
    }
    


    const Project_possibleTypes: string[] = ['Project']
    export const isProject = (obj?: { __typename?: any } | null): obj is Project => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isProject"')
      return Project_possibleTypes.includes(obj.__typename)
    }
    