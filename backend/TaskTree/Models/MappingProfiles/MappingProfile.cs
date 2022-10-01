using AutoMapper;
using TaskTree.Models.Requests;
using TaskTree.Models.Responses;

namespace TaskTree.Models.MappingProfiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMapNoNull<UpdateUserRequest, User>();
        CreateMap<CreateUserRequest, User>(MemberList.Source);
        CreateMap<User, UserResponse>(MemberList.Source);
    }

    // This is a helper wrapper around the CreateMap function that allows us to concisely specify a mapping should not override non-null values with null ones
    private IMappingExpression<TSource, TDestination> CreateMapNoNull<TSource, TDestination>(MemberList memberList = MemberList.Destination)
    {
        IMappingExpression<TSource, TDestination> result = CreateMap<TSource, TDestination>(memberList);
        
        result.ForAllMembers(x => x.Condition((src, dest, sourceValue) => sourceValue != null));

        return result;
    }
}