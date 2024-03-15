from django.contrib import admin
from .models import Book, Author

class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'published_date')
    list_filter = ('genre', 'published_date')
    search_fields = ('title', 'author')

    # def get_urls(self):
    #     urls = super().get_urls()
    #     extra_urls = [
    #         path('delall/',
    #              self.admin_site.admin_view(self.admin_del_all),
    #              name='%s_%s_delall' % (self.model_meta.app_label,self.model.meta.model_name)),
    #     ]
    #     return extra_urls + urls


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'birth_date', 'country')
    list_filter = ('country',)
    search_fields = ('name',)


admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)

