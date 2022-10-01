using AutoMapper;
using TaskTree.Models.Requests;

namespace TaskTree.Models.MappingProfiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UpdateUserRequest, User>().ForAllMembers(x => x.Condition((src, dest, sourceValue) => sourceValue != null));
        CreateMap<CreateUserRequest, User>(MemberList.Source).ForAllMembers(x => x.Condition((src, dest, sourceValue) => sourceValue != null));
    }
}